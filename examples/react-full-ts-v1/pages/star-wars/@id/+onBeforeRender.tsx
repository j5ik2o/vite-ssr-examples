// https://vite-plugin-ssr.com/onBeforeRender
import fetch from "cross-fetch";
import { filterMovieData } from "../filterMovieData";
import type { PageContextBuiltIn } from "vite-plugin-ssr/types";
import type { MovieDetails } from "../types";
import { render } from "vite-plugin-ssr/abort";
import React from "react";

const onBeforeRender = async (pageContext: PageContextBuiltIn) => {
  const dataUrl = `https://star-wars.brillout.com/api/films/${pageContext.routeParams.id}.json`;
  let movie: MovieDetails;
  try {
    const response = await fetch(dataUrl);
    movie = (await response.json()) as MovieDetails;
  } catch (err) {
    console.error(err);
    //*/
    throw render(
      503,
      `Couldn't fetch data, because failed HTTP GET request to ${dataUrl}`,
    );
    /*/
    throw render(
      503,
      <>
        Couldn't fetch data, because failed HTTP GET request to <code>{dataUrl}</code>.
      </>
    )
    //*/
  }

  // We remove data we don't need because we pass `pageContext.movie` to
  // the client; we want to minimize what is sent over the network.
  movie = filterMovieData(movie);

  const { title } = movie;

  return {
    pageContext: {
      pageProps: {
        movie,
      },
      // The page's <title>
      title,
    },
  };
};

export default onBeforeRender;
