function encodeClientCredentials() {
    const clientIdInput = document.getElementById('client-id').value;
    const clientSecretInput = document.getElementById('client-secret').value;

    const credentials = `${clientIdInput}:${clientSecretInput}`;
    const base64Credentials = btoa(credentials);
    console.log(base64Credentials);
    document.getElementById('encodedCredentials').value = `Basic ${base64Credentials}`;
}

function copyEncoded() {
    document.getElementById('gnbtncopy').innerHTML = 'Copiado!';
    navigator.clipboard.writeText(document.getElementById('encodedCredentials').value);
    setTimeout(() => {
        document.getElementById('gnbtncopy').innerHTML = 'Clique aqui para copiar!';
    }, 1000)
}