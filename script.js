const	canva = document.getElementById('canva');
const	ctx = canva.getContext('2d');
let		drawing = false;
let		color = document.getElementById('colorpicker');
let		line_width = document.getElementById('rangeValue');
let		tool_holder = document.getElementById('holder');
let		x = 0;
let		y = 0;
let		brush = 1;

function updatecanva(){
	let	offsetX = canva.offsetLeft;
	let	offsetY = canva.offsetTop;

	canva.width = window.innerWidth - offsetX;
	canva.height = window.innerHeight - offsetY;
	document.getElementById('slid').value = 5;
}

document.addEventListener("DOMContentLoaded", updatecanva);
window.addEventListener('resize', updatecanva);

canva.addEventListener('mousedown', (e) => {
	x = e.offsetX;
	y = e.offsetY;
	drawing = true;
});

canva.addEventListener("mousemove" ,(e) =>{
	if(drawing === true){
	   draw_line(x, y, e.offsetX, e.offsetY);
	   x = e.offsetX;
	   y = e.offsetY;
	}
 });

canva.addEventListener('mouseup', (e) => {
	if(drawing === true){
		draw_line(x, y, e.offsetX, e.offsetY);
		x = 0;
		y = 0;
		drawing = false;
	}
});

function clearcanva(){
	ctx.clearRect(0, 0, canva.width, canva.height);
}

function change_tool() {
	brush = !brush;
	if (brush)
		tool_holder.innerHTML = "Brush";
	else
		tool_holder.innerHTML = "Eraser";
}

function draw_line(x, y, x2, y2){
	ctx.beginPath();
	
	if (brush)
		ctx.strokeStyle = color.value, ctx.lineWidth = line_width.innerHTML;
	else
		ctx.strokeStyle = 'White', ctx.lineWidth = line_width.innerHTML * 2;
	ctx.lineCap = "round";
	ctx.lineJoin = "round";
	ctx.moveTo(x, y);
	ctx.lineTo(x2, y2);
	ctx.stroke();
    ctx.closePath();
};
