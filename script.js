// Sales Page Script
function sendData() {
    const name = document.getElementById('name').value;
    const customerName = document.getElementById('customerName').value;
    const poNumber = document.getElementById('poNumber').value;
    const info = document.getElementById('info').value;
    const fileInput = document.getElementById('file');
    
    if (!name || !customerName || !poNumber || !info || !fileInput.files.length) {
        alert('Please fill all fields.');
        return;
    }
    
    const file = fileInput.files[0];
    const reader = new FileReader();
    
    reader.onload = function(e) {
        const fileData = e.target.result;
        const fileName = file.name;
        
        const salesData = {
            name: name,
            customerName: customerName,
            poNumber: poNumber,
            info: info,
            fileName: fileName,
            fileData: fileData,
            status: 'pending'
        };
        
        const pendingFiles = JSON.parse(localStorage.getItem('pendingFiles')) || [];
        pendingFiles.push(salesData);
        localStorage.setItem('pendingFiles', JSON.stringify(pendingFiles));
        
        // Clear form and reset to initial state
        document.getElementById('salesForm').reset();
        alert('File sent successfully.');
    };
    
    reader.readAsDataURL(file);
}

function leftAdminPage() {
    window.location.href = "../index.html"
}

function loginAdmSales() {
    document.getElementById("loginPageCard").style.display = "flex";
}

function closeLogin() {
    document.getElementById("loginPageCard").style.display = "none";
}

function enterLogin() {
    const x = document.getElementById("uName").value;
    const y = document.getElementById("pWord").value;

    if(x == "adm.sales@pas" && y == "pas.adm.sales.v2") {
        window.location.href = "./xsynasn2jfi3K22K92JJseH/admin.html"
    } else {
        alert("Userame/Password salah!");
    }
}

// Admin Page Script
function showTab(tabId) {
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => tab.style.display = 'none');
    document.getElementById(tabId).style.display = 'block';
    loadTable(tabId);
}

function loadTable(tabId) {
    const tableId = `${tabId}Table`;
    const files = JSON.parse(localStorage.getItem(`${tabId}Files`)) || [];
    
    const tableBody = document.querySelector(`#${tableId} tbody`);
    tableBody.innerHTML = '';
    
    files.forEach((file, index) => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${file.name}</td>
            <td>${file.customerName}</td>
            <td>${file.poNumber}</td>
            <td><a href="${file.fileData}" download="${file.fileName}">${file.fileName}</a></td>
            <td>${file.info}</td>
            <td>
                ${tabId === 'pending' 
                    ? `<button onclick="moveFile('${tabId}', ${index}, 'done')">Done</button>
                        <button onclick="moveFile('${tabId}', ${index}, 'cancel')">Cancel</button>`
                    : (tabId === 'done'
                        ? `<button onclick="moveFile('${tabId}', ${index}, 'cancel')">Cancel</button>
                            <button onclick="deleteFile('${tabId}', ${index})">Delete</button>`
                        : `<button onclick="moveFile('${tabId}', ${index}, 'done')">Done</button>
                            <button onclick="deleteFile('${tabId}', ${index})">Delete</button>`
                    )
                }
            </td>
        `;
        
        tableBody.appendChild(row);
    });
}

function moveFile(fromTab, index, toTab) {
    const fromFiles = JSON.parse(localStorage.getItem(`${fromTab}Files`)) || [];
    const toFiles = JSON.parse(localStorage.getItem(`${toTab}Files`)) || [];
    
    const file = fromFiles.splice(index, 1)[0];
    file.status = toTab;
    
    // Insert new file at the beginning of the toTab list
    toFiles.unshift(file);
    
    localStorage.setItem(`${fromTab}Files`, JSON.stringify(fromFiles));
    localStorage.setItem(`${toTab}Files`, JSON.stringify(toFiles));
    
    loadTable(fromTab);
    loadTable(toTab);
}

function deleteFile(tabId, index) {
    const files = JSON.parse(localStorage.getItem(`${tabId}Files`)) || [];
    files.splice(index, 1);
    localStorage.setItem(`${tabId}Files`, JSON.stringify(files));
    loadTable(tabId);
}

document.getElementById("pending").style.display="block";