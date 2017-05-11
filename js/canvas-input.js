console.log('canvas input');

var input = new CanvasInput({
  canvas: document.getElementById('canvas-input'),
  fontSize: 18,
  fontFamily: 'Arial',
  fontColor: '#212121',
  fontWeight: 'bold',
  width: 300,
  height: 100,
  padding: 8,
  borderWidth: 1,
  borderColor: '#000',
  borderRadius: 3,
  boxShadow: '1px 1px 0px #fff',
  innerShadow: '0px 0px 5px rgba(0, 0, 0, 0.5)',
  //placeHolder: 'Enter message here...'
});