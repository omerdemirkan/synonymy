import React from 'react';

function applyHighlight(text, highlight, style) {

    let parts = text.split(new RegExp(`\w*(${highlight})\w*`, 'gi'));
    return parts.map(part => part.toLowerCase() === highlight.toLowerCase() ? <mark style={style}>{part}</mark> : part);
}

export default applyHighlight;