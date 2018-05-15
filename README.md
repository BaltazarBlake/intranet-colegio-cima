# Configurar plantilla webpack-simple VUE-CLI
## Descargar plantilla
```
vue init webpack-simple [nombre-proyecto]
```
## Instalar url-loader y resolve-url-loader
```
npm i -D url-loader resolve-url-loader
```
## Configurar webpack (webpack.config.js)
### Agregar regla 
```js
module: {
    rules: [
    ...
        {
         test: /\.(woff|woff2|eot|ttf)(\?.*$|$)/,
         loader: 'url-loader?importLoaders=1&limit=100000'  
        },
    ]
    ...
}
```
### Agregar loader (resolve-url-loader)

```js
    {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'resolve-url-loader',  // agregado resolve-url-loader
          'sass-loader?sourceMap'  //sourceMap
        ],
    },
    ...
    {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            'scss': [
              'vue-style-loader',
              'css-loader',
              'resolve-url-loader',  //agregado resolve-url-loader
              'sass-loader?sourceMap' //sourceMap
            ],
            'sass': [
              'vue-style-loader',
              'css-loader',
              'sass-loader?indentedSyntax'
            ]
          }
          // other vue-loader options go here
        }
      },
```
## Instalar pug
```
npm i -D pug
```
## Instalar vue-router
```
npm i vue-router
```
## Instalar jwt-decode
```
npm i jwt-decode
```
## Solución regeneratorRuntime is not defines
````
npm install --save-dev babel-plugin-transform-runtime
npm install babel-plugin-transform-async-to-generator --save-dev
```
.babelrc
````
{
  "presets": [
    ["env", { "modules": false }],
    "stage-3"
  ],
  "plugins": [
    "transform-runtime"
  ]
}
```