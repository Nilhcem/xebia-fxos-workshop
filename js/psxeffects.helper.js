/* Photo Effects Helper File */
PsxEffects.initialize();
function performEffect(type, orig, canvas) {
    canvas.width = orig.width;
    canvas.height = orig.height;

    var ctx = canvas.getContext("2d");
    ctx.drawImage(orig, 0, 0);
    var imgData = ctx.getImageData(0, 0, orig.width, orig.height);

    var effectmap = new Object();
    effectmap['sepia'] = PsxEffects.Color.sepia;
    effectmap['blackwhite'] = PsxEffects.Color.blackwhite;
    effectmap['bluetone'] = PsxEffects.Color.bluetone;
    effectmap['greentone'] = PsxEffects.Color.greentone;
    effectmap['solarize'] = PsxEffects.Color.solarize;
    effectmap['mosaic'] = PsxEffects.Deform.mosaic;
    effectmap['mirrorleft2right'] = function(src,dst){
	PsxEffects.Deform.mirror(src, dst, 'left2right');
    };

    effectmap['invert'] = PsxEffects.Color.invertColor;
    effectmap['infrared'] = PsxEffects.Color.infrared;
    effectmap['emboss'] = PsxEffects.Color.emboss;
    effectmap['color1'] = PsxEffects.ColorShift.color1;
    effectmap['color2'] = PsxEffects.ColorShift.color2;
    effectmap['color3'] = PsxEffects.ColorShift.color3;
    effectmap['color4'] = PsxEffects.ColorShift.color4;
    effectmap['color5'] = PsxEffects.ColorShift.color5;
    effectmap['emboss']= PsxEffects.Convolution.emboss;
    effectmap['blur']= PsxEffects.Convolution.blur;
    effectmap['sharpen']= PsxEffects.Convolution.sharpen;
    effectmap['edgedetect']= PsxEffects.Convolution.edgedetect;
    effectmap['fisheye'] = PsxEffects.Deform.fisheye;
    effectmap['shrink'] = PsxEffects.Deform.shrink;

    var effectFunc = effectmap[type];
    effectFunc(imgData, imgData);
    ctx.putImageData(imgData, 0, 0);
}
