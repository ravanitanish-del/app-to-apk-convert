let conversionInProgress = false;

function convertToAPK() {
    if (conversionInProgress) return;
    
    const url = document.getElementById('websiteUrl').value;
    const appName = document.getElementById('appName').value;
    const packageName = document.getElementById('packageName').value;
    
    if (!url || !isValidUrl(url)) {
        alert('Please enter a valid website URL');
        return;
    }
    
    conversionInProgress = true;
    const btn = document.querySelector('.convert-btn');
    const progress = document.getElementById('progressBar');
    const span = btn.querySelector('span');
    
    // Animate button
    btn.disabled = true;
    span.textContent = 'Converting...';
    progress.style.width = '100%';
    
    // Simulate conversion process
    setTimeout(() => {
        // Stage 1: Fetch website
        span.textContent = 'Fetching website...';
        progress.style.width = '30%';
        
        setTimeout(() => {
            // Stage 2: Generate APK
            span.textContent = 'Building APK...';
            progress.style.width = '70%';
            
            setTimeout(() => {
                // Stage 3: Finalizing
                span.textContent = 'Finalizing...';
                progress.style.width = '100%';
                
                setTimeout(() => {
                    completeConversion(url, appName, packageName);
                }, 1500);
            }, 2000);
        }, 1000);
    }, 500);
}

function completeConversion(url, appName, packageName) {
    // Hide converter, show download
    document.querySelector('.converter-section').style.display = 'none';
    document.querySelector('.features').style.display = 'none';
    document.getElementById('downloadSection').style.display = 'block';
    
    // Set download link (demo - in real app, this would be server-generated)
    const downloadLink = document.getElementById('downloadLink');
    downloadLink.href = '#';
    downloadLink.download = `${packageName.replace(/[^a-z0-9]/gi, '')}.apk`;
    
    // Generate QR code for download page
    const qrCanvas = document.getElementById('qrCode');
    QRCode.toCanvas(qrCanvas, window.location.href, {
        width: 200,
        margin: 2,
        color: {
            dark: '#333',
            light: '#fff'
        }
    });
    
    conversionInProgress = false;
}

function newConversion() {
    document.querySelector('.converter-section').style.display = 'block';
    document.querySelector('.features').style.display = 'block';
    document.getElementById('downloadSection').style.display = 'none';
    
    // Reset form
    document.getElementById('websiteUrl').value = '';
    document.getElementById('appName').value = 'My Web App';
    document.getElementById('packageName').value = 'com.myapp.web';
    document.querySelector('.convert-btn').disabled = false;
    document.querySelector('.convert-btn span').textContent = 'Convert to APK';
    document.getElementById('progressBar').style.width = '0%';
}

function isValidUrl(string) {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
}

// Auto-focus URL input
document.getElementById('websiteUrl').focus();

// Form validation on input
document.getElementById('websiteUrl').addEventListener('input', function() {
    const btn = document.querySelector('.convert-btn');
    if (isValidUrl(this.value)) {
        btn.style.opacity = '1';
        btn.style.cursor = 'pointer';
    } else {
        btn.style.opacity = '0.6';
        btn.style.cursor = 'not-allowed';
    }
});

// Real-time package name validation
document.getElementById('appName').addEventListener('input', function() {
    const packageName = document.getElementById('packageName');
    const cleanName = this.value.toLowerCase()
        .replace(/[^a-z0-9\s]/g, '')
        .trim()
        .replace(/\s+/g, '.');
    packageName.value = `com.${cleanName || 'myapp'}.web`;
});

// Copy to clipboard functionality
document.getElementById('packageName').addEventListener('focus', function() {
    this.select();
});

// Enter key support
document.addEventListener('keypress', function