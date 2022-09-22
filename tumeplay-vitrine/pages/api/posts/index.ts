// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import type { AxiosError } from "axios";
import { Error } from "../types";
import { Post, ZPost } from "./types";

const NEXT_PUBLIC_STRAPI_URL: string = process.env
  .NEXT_PUBLIC_STRAPI_URL as string;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Error | Post[]>
) {
  const { query } = req;

  let params: { [key: string]: string | string[] | boolean | number } = {
    _start: query.start || 0,
    _limit: query.limit || 36,
    title_mobile_null: false,
    thematique_mobile_null: false,
  };

  if (query["theme[]"]) {
    params.thematique_mobile_in = Array.isArray(query["theme[]"])
      ? query["theme[]"]
      : [query["theme[]"]];
  }

  if (query.search) {
    params._q = query.search;
  }

  axios
    .get(`${NEXT_PUBLIC_STRAPI_URL}/contents`, {
      params,
    })
    .then((response) => {
      res.status(200).json(
        response.data.map((c: any) =>
          ZPost.parse({
            ...c,
            image: { ...c.image, url: NEXT_PUBLIC_STRAPI_URL + c.image?.url },
            thematique_mobile: {
              ...c.thematique_mobile,
              image: {
                ...c.thematique_mobile.image,
                url: NEXT_PUBLIC_STRAPI_URL + c.thematique_mobile.image?.url,
              },
            },
            etiquette: {
              ...c.etiquette,
              image: {
                ...c.etiquette?.image,
                url: NEXT_PUBLIC_STRAPI_URL + c.etiquette?.image?.url,
              },
            },
          })
        )
      );
    })
    .catch((e: Error | AxiosError) => {
      if (axios.isAxiosError(e)) {
        res
          .status(e?.response?.status as number)
          .json({ message: e?.response?.statusText as string });
      } else {
        console.log(e);
        res.status(500).json({ message: JSON.parse(e.message) });
      }
    });
}
