const applyHighlight = (text, word) => {
    return text.replace(word, "<mark>" + word + "</mark>");
}

export default applyHighlight;