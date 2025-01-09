const NoImage = require("../assets/noimage.png");


export function makeImagePath(id: string, format?: string) {
    if (id === "" || id === null || id === undefined) {
      return NoImage;
    } else {
      return `https://image.tmdb.org/t/p/${format ? format : "original"}/${id}`;
    }
  }