export default {
  hashHistory: true,
  // exportStatic: true, //静态化
  plugins: [
    'umi-plugin-dva',
    [
      'umi-plugin-routes',
      {
        exclude: [
          /models/,
          /services/,
        ],
      },
    ],
  ],
}
