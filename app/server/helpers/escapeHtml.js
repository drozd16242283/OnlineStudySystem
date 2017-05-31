const escapeHtml = (str) => {
    return str.replace(/[&<"']/g, function(m) {
    switch (m) {
      case '&':
        return '&amp;'
      case '<':
        return '&lt;'
      case '"':
        return '&quot;'
      default:
        return '&#039;'
    }
  })
}

export default escapeHtml
