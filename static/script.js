function checkSSL() {
    var domain = document.getElementById("domain").value.trim();
    if (domain === "") {
        displayAlert("Please enter a domain.");
        return;
    }

    // Regular expression to validate domain format
    var domainPattern = /^(?!:\/\/)(?:www\.)?[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/;

    if (!domainPattern.test(domain)) {
        displayAlert("Please enter a valid domain.");
        return;
    }

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/check_ssl", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);
                displaySSLInfo(response);
            } else {
                displayAlert("Error occurred. Please try again.");
            }
        }
    };
    xhr.send(JSON.stringify({ "domain": domain }));
}

function displayAlert(message, type) {
    var alertMessageDiv = document.getElementById("alertMessage");
    alertMessageDiv.textContent = message;
    alertMessageDiv.style.display = "block";

    // Hide the alert after 3 seconds
    setTimeout(function() {
        alertMessageDiv.style.display = "none";
    }, 3000); // 3000 milliseconds = 3 seconds
}
function resetForm() {
    // Clear the input field
    document.getElementById("domain").value = "";

    // Hide the SSL information container
    document.getElementById("sslInfo").style.display = "none";

    // Hide the alert message
    document.getElementById("alertMessage").style.display = "none";
}


function displaySSLInfo(info) {
    var sslInfoDiv = document.getElementById("sslInfo");
    if (info.hasOwnProperty("Error")) {
        sslInfoDiv.innerHTML = "<p>Error: " + info["Error"] + "</p>";
    } else {
        var html = "<h2>SSL Certificate Information for " + info["Common Name"] + "</h2>";
        html += "<p><strong>Issuer:</strong> " + info["Issuer"] + "</p>";
        html += "<p><strong>Issued On:</strong> " + info["Issued On"] + "</p>";
        html += "<p><strong>Expires On:</strong> " + info["Expires On"] + "</p>";
        html += "<p><strong>Days Until Expiry:</strong> " + info["Days Until Expiry"] + "</p>";
        sslInfoDiv.innerHTML = html;
    }
}


function displaySSLInfo(info) {
    var sslInfoDiv = document.getElementById("sslInfo");
    if (info.hasOwnProperty("Error")) {
        sslInfoDiv.innerHTML = "<p>Error: " + info["Error"] + "</p>";
        sslInfoDiv.style.display = "none"; // Hide the container if there's an error
    } else {
        var html = "<h2>SSL Certificate Information for " + info["Common Name"] + "</h2>";
        html += "<p><strong>Issuer:</strong> " + info["Issuer"] + "</p>";
        html += "<p><strong>Issued On:</strong> " + info["Issued On"] + "</p>";
        html += "<p><strong>Expires On:</strong> " + info["Expires On"] + "</p>";
        html += "<p><strong>Days Until Expiry:</strong> " + info["Days Until Expiry"] + "</p>";
        sslInfoDiv.innerHTML = html;
        sslInfoDiv.style.display = "block"; // Show the container if there's no error
    }
}

