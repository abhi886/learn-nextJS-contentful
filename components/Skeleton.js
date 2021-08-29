import React from "react";

export default function Skeleton() {
  return (
    <div className='skeleton'>
      <div className='s-banner'></div>
      <div className='s-header'></div>
      <div className='s-content'></div>
      <style jsx>{`
        .skeleton {
          max-width: 1200px;
          margin: 20px auto;
        }
        .skeleton > div {
          background: #dbcc1a;
          border-radius: 4px;
          margin: 20px 0;
        }
        .s-banner {
          padding: 12% 0;
        }
      `}</style>
    </div>
  );
}
