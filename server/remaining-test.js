import { randomUUID } from "node:crypto";

const BASE = "http://localhost:5000";
const marker = randomUUID();

const testEmail = `crud-test-${marker}@example.com`;
const originalTitle = `TEMP CERTIFICATE ${marker}`;
const updatedTitle = `TEMP CERTIFICATE UPDATED ${marker}`;

let token = null;
let certificateId = null;
let contactId = null;
let failed = false;

async function api(path, options = {}) {
    const response = await fetch(`${BASE}${path}`, {
        ...options,
        headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...(options.body ? { "Content-Type": "application/json" } : {}),
            ...options.headers
        }
    });

    const data = await response.json();

    if (!response.ok || data.success === false) {
        throw new Error(data.message || `HTTP ${response.status}`);
    }

    return data;
}

async function cleanup() {
    console.log("\n===== AUTOMATIC CLEANUP =====");

    if (!token) {
        console.log("No authenticated session; manual cleanup may be needed.");
        return;
    }

    try {
        // Find and delete only our uniquely identified test contact.
        const contacts = await api("/api/contact");
        const testContact = contacts.messages?.find(
            item => item.email === testEmail
        );

        if (testContact) {
            await api(`/api/contact/${testContact.id}`, {
                method: "DELETE"
            });
            console.log("Temporary contact deleted.");
        } else {
            console.log("No temporary contact remains.");
        }
    } catch (error) {
        console.error("Contact cleanup warning:", error.message);
        failed = true;
    }

    try {
        // Find our certificate by its unique title if necessary.
        const certificates = await api("/api/certificates");

        const testCertificate = certificates.certificates?.find(
            item =>
                item.title === originalTitle ||
                item.title === updatedTitle
        );

        const id = certificateId || testCertificate?.id;

        if (id) {
            await api(`/api/certificates/${id}`, {
                method: "DELETE"
            });
            console.log("Temporary certificate deleted.");
        } else {
            console.log("No temporary certificate remains.");
        }
    } catch (error) {
        console.error("Certificate cleanup warning:", error.message);
        failed = true;
    }
}

try {
    console.log("===== REMAINING API TESTS =====");

    const password = process.env.ADMIN_TEST_PASSWORD;

    if (!password) {
        throw new Error("Admin password was not provided.");
    }

    // 1. Login
    console.log("\n[1/5] ADMIN LOGIN");

    const login = await api("/api/login", {
        method: "POST",
        body: JSON.stringify({ password })
    });

    token = login.token;

    if (!token) throw new Error("No authentication token returned.");

    console.log("PASS: Admin login");

    // 2. Analytics
    console.log("\n[2/5] ANALYTICS");

    const analytics = await api("/api/analytics");

    const requiredFields = [
        "uniqueVisitors",
        "totalVisits",
        "totalMessages",
        "totalProjects",
        "totalCertificates",
        "recentVisitors",
        "recentMessages"
    ];

    for (const field of requiredFields) {
        if (!(field in analytics.analytics)) {
            throw new Error(`Analytics field missing: ${field}`);
        }
    }

    console.log("PASS: Analytics retrieved; required fields present.");

    // 3. Contact create/read/delete
    console.log("\n[3/5] CONTACT MESSAGES");

    await api("/api/contact", {
        method: "POST",
        body: JSON.stringify({
            name: "Temporary API Test",
            email: testEmail,
            message: `Temporary contact test ${marker}`
        })
    });

    console.log("PASS: Contact message created.");

    const contacts = await api("/api/contact");

    const contact = contacts.messages?.find(
        item => item.email === testEmail
    );

    if (!contact) throw new Error("Temporary contact not found.");

    contactId = contact.id;

    console.log("PASS: Contact message retrieved.");

    await api(`/api/contact/${contactId}`, {
        method: "DELETE"
    });

    contactId = null;

    console.log("PASS: Contact message deleted.");

    // 4. Certificate CRUD
    console.log("\n[4/5] CERTIFICATES");

    const created = await api("/api/certificates", {
        method: "POST",
        body: JSON.stringify({
            title: originalTitle,
            issuer: "Temporary API Test",
            date: "2026-10-31",
            link: "https://example.com"
        })
    });

    certificateId = created.certificateId;

    if (!certificateId) {
        throw new Error("Certificate ID was not returned.");
    }

    console.log("PASS: Certificate created.");

    let certificateList = await api("/api/certificates");

    if (!certificateList.certificates?.some(
        item => String(item.id) === String(certificateId)
    )) {
        throw new Error("Created certificate not found.");
    }

    console.log("PASS: Certificate retrieved.");

    await api(`/api/certificates/${certificateId}`, {
        method: "PUT",
        body: JSON.stringify({
            title: updatedTitle,
            issuer: "Updated Temporary API Test",
            date: "2026-10-31",
            link: "https://example.com/updated"
        })
    });

    console.log("PASS: Certificate updated.");

    certificateList = await api("/api/certificates");

    const updated = certificateList.certificates?.find(
        item => String(item.id) === String(certificateId)
    );

    if (!updated || updated.title !== updatedTitle) {
        throw new Error("Certificate update verification failed.");
    }

    console.log("PASS: Updated certificate verified.");

    await api(`/api/certificates/${certificateId}`, {
        method: "DELETE"
    });

    certificateId = null;

    console.log("PASS: Certificate deleted.");

    // 5. Admin activity
    console.log("\n[5/5] ADMIN ACTIVITY");

    const activity = await api("/api/admin/activity");

    if (!Array.isArray(activity.activity)) {
        throw new Error("Admin activity response is invalid.");
    }

    console.log("PASS: Admin activity retrieved.");

} catch (error) {
    failed = true;
    console.error("\nTEST ERROR:", error.message);

} finally {
    await cleanup();

    console.log("\n===== FINAL RESULT =====");
    console.log(failed ? "TEST FAILED — REVIEW OUTPUT" : "ALL TESTS PASSED");

    process.exitCode = failed ? 1 : 0;
}
