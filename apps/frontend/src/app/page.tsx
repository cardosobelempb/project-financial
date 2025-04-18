import { somar } from '@shared/core';

export default function Home() {
  return (
    <div>
      <h1>{somar(5, 3)}</h1>
    </div>
  );
}
