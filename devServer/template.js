const template = (headContent, rootContent, bottomContent, title = 'FRA DevServer') => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>${title}</title>
  ${headContent}
</head>
<body>
  <div id="root">${rootContent}</div>
  ${bottomContent}
</body>
</html>
`

module.exports = template
