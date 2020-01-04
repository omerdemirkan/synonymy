import React from 'react';

function applyHighlight(text, highlight) {

    let parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return <span>{parts.map(part => part.toLowerCase() === highlight.toLowerCase() ? <mark>{part}</mark> : part)}</span>;
}

export default applyHighlight;