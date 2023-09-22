const	canva = document.getElementById('canva');
const	color = document.getElementById('colorpicker');
const	line_width = document.getElementById('rangeValue');
const	tool_holder = document.getElementById('holder');
const	slider = document.getElementById('slid');

let		drawing = false;
let		x = 0;
let		y = 0;
let		brush = 1;
const	ctx = canva.getContext('2d');
let		tool_data = [["Erraser", "White", 5], ["Brush", "BLACK", 5]];

document.addEventListener("DOMContentLoaded", updatecanva);
window.addEventListener('resize', updatecanva);

canva.addEventListener('mousedown', (e) => {
	x = e.offsetX;
	y = e.offsetY;
	drawing = true;
});

canva.addEventListener ("mouseout", (e) => {
	if(drawing === true){
		draw_line(x, y, e.offsetX, e.offsetY);
		drawing = false;
		y = x = 0;
	}
}, false);

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

function updatecanva(){
	let	offsetX = canva.offsetLeft;
	let	offsetY = canva.offsetTop;

	canva.width = window.innerWidth - offsetX;
	canva.height = window.innerHeight - offsetY;
	slider.value = tool_data[brush][2];
}

function update_size(){
	line_width.innerText = slider.value;
	tool_data[brush][2] = line_width.innerHTML;
}

function change_tool() {
	brush = Number(!brush);

	tool_holder.innerHTML = tool_data[brush][0];
	tool_holder.style.color = tool_data[brush][1];
	line_width.innerHTML = tool_data[brush][2];
	slider.value = tool_data[brush][2];
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
