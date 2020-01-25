import React, { useState } from 'react';

const Fortune = () => {
  const [getFortune, setFortune] = useState(null)

  return (
    <h1>Your Fortune: {getFortune}</h1>
  );
}

export default Fortune;
