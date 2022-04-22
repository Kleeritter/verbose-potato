const clientId = "e800d12fc12c4d60960778b2bc4370af";
const viewerOptions = {
    embedMode: "LIGHT_BOX",
    defaultViewMode: "FIT_PAGE",
    showDownloadPDF: false,
    showPrintPDF: false
};

function fetchPDF(urlToPDF) {
    return new Promise((resolve) => {
        fetch(urlToPDF)
            .then((resolve) => resolve.blob())
            .then((blob) => {
                resolve(blob.arrayBuffer());
            })
    })
}

function showPDF(urlToPDF) {
    var adobeDCView = new AdobeDC.View({
            clientId: clientId
        });
        var previewFilePromise = adobeDCView.previewFile(
            {
                content: { promise: fetchPDF(urlToPDF) },
                metaData: { fileName: urlToPDF.split("/").slice(-1)[0] }
            },
            viewerOptions
        );
}

document.addEventListener("adobe_dc_view_sdk.ready", function () {
    document.getElementById("showPDF01").addEventListener("click", function () {
        showPDF("https://documentcloud.adobe.com/view-sdk-demo/PDFs/Summary.pdf")
    });
    document.getElementById("showPDF02").addEventListener("click", function () {
        showPDF("https://documentcloud.adobe.com/view-sdk-demo/PDFs/Bodea Brochure.pdf")
    });
    document.getElementById("showPDF03").addEventListener("click", function () {
        showPDF("https://documentcloud.adobe.com/view-sdk-demo/PDFs/Overview.pdf")
    });
});

// Add arrayBuffer if necessary i.e. Safari
(function () {
    if (Blob.arrayBuffer != "function") {
        Blob.prototype.arrayBuffer = myArrayBuffer;
    }

    function myArrayBuffer() {
        return new Promise((resolve) => {
            let fileReader = new FileReader();
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.readAsArrayBuffer(this);
        });
    }
})();
