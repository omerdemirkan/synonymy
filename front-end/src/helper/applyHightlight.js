const applyHighlight = (text, word) => {
    return text.replace(word, '<span>' + word + '</span>');
}

export default applyHighlight;