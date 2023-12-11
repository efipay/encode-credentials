
function copyEncoded(type) {
    let inputId = type == 'cert' ? 'convertedCert' : 'convertedKey';
    let copyId = type == 'cert' ? 'copyCert' : 'copyKey';
    document.getElementById(copyId).innerHTML = 'Copiado!';
    navigator.clipboard.writeText(document.getElementById(inputId).value);
    setTimeout(() => {
        document.getElementById(copyId).innerHTML = 'Copiar conteúdo!';
    }, 1000)
}


function saveFile(type) {
    let btnId = type == 'cert' ? 'saveCert' : 'saveKey';
    let content
    let fileName

    switch (type) {
        case 'cert':
            btnId = 'saveCert'
            content = document.getElementById('convertedCert').value
            fileName = 'certificado.pem'
            break;
        case 'key':
            btnId = 'savekey'
            content = document.getElementById('convertedkey').value
            fileName = 'key.pem'
            break;
        case 'completed':
            btnId = 'saveCompleted'
            content = document.getElementById('completedCert').value
            fileName = 'certificadoFull.pem'
            break;
    }


    let btn = document.getElementById(btnId)

    const blob = new Blob([content], { type: 'text/plain' });

    // Cria um elemento <a> para realizar o download do arquivo
    btn.href = window.URL.createObjectURL(blob);
    btn.download = fileName;

}


function convertCertificate() {

    let p12cert = document.getElementById('arquivo').files[0]
    var reader = new FileReader();

    reader.onload = (function (theFile) {
        return function (eve) {

            const p12Der = forge.util.createBuffer(eve.target.result, 'binary').getBytes();

            var p12Asn1 = forge.asn1.fromDer(p12Der);

            const p12 = forge.pkcs12.pkcs12FromAsn1(p12Asn1, false, '');

            const bags = p12.getBags({ bagType: forge.pki.oids.certBag });
            const cert = bags[forge.pki.oids.certBag][0];
            const privateKey = p12.getBags({ bagType: forge.pki.oids.pkcs8ShroudedKeyBag })[forge.pki.oids.pkcs8ShroudedKeyBag][0];
            const pemCert = forge.pki.certificateToPem(cert.cert);
            const pemPrivateKey = forge.pki.privateKeyToPem(privateKey.key, { format: 'pkcs8' });

            document.getElementById('convertedCert').value = pemCert
            document.getElementById('convertedKey').value = pemPrivateKey
            document.getElementById('completedCert').value = pemCert + '\n' + pemPrivateKey


        };
    })(p12cert);

    reader.readAsArrayBuffer(p12cert);

}