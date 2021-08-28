import React from "react";
import Link from "next/link";
import Image from "next/image";
import { async } from "../pages/index";

export default function ReceipeCard({ receipe }) {
  const { title, slug, cookingTime, thumbnail } = receipe.fields;
  return (
    <div className='card'>
      <div className='featured'>
        <Image
          src={`https:${thumbnail.fields.file.url}`}
          width={thumbnail.fields.file.details.image.width}
          height={thumbnail.fields.file.details.image.height}
        ></Image>
      </div>
      <div className='content'>
        <div className='info'>
          <h4>{title}</h4>
          <p>Takes approx {cookingTime} mins to make</p>
        </div>
        <div className='actions'>
          <Link href={`/receipes/${encodeURIComponent(slug)}`}>
            <a>Cook This</a>
          </Link>
        </div>
      </div>
    </div>
  );
}
