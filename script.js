const imageUpload = document.getElementById('imageUpload');

Promise.all([
    faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
    faceapi.nets.ssdMobilenetv1.loadFromUri('/models')
]).then(start);


function start() {
    const container = document.createElement('div');
    container.style.position= 'relative';
    document.body.append(container);
    document.body.append('Loaded');
    imageUpload.addEventListener('change', async () => {
        const image = await faceapi.bufferToImage(imageUpload.files[0]);
        container.append(image)
        const canvas = faceapi.createCanvasFromMedia(image);
        container.append(canvas)
        const displaySize = { width: image.width, height: image.height }
        faceapi.matchDimensions(canvas, displaySize)
        const detections = await faceapi.detectAllFaces(image).withFaceLandmarks().withFaceDescriptors();
        // document.body.append(detection.length) //we understand how many faces on the picture
        const resizeDetections = faceapi.resizeResults(detections, displaySize);
        resizeDetections.forEach(detection => {
            const box = detection.detection.box;
            const drawBox = new faceapi.draw.DrawBox(box, { label: 'Face' })
            drawBox.draw(canvas)
        })
    })
}

function loadLabeledImages() {
    const labels = ['Black', 'Capitan A', 'Capitan M', 'Hawk', 'Jim', 'Thor', 'Tony'];
    return Promise.all(
        labels.map(async label => {
            for(let i = 1; i <= 2; i++){
                
            }
        })
    )
}

