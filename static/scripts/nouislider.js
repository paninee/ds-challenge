var handlesSlider = document.getElementById('range');
noUiSlider.create(handlesSlider, {
    start: [4000, 8000],
    range: {
        'min': [2000],
        'max': [10000]
    }
})