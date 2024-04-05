'use client'

import React from 'react'
import SimpleMDE from 'react-simplemde-editor'

type Props = {}

const CommentField = () => {
  const [value, setValue] = React.useState("Initial value");

  const onChange = React.useCallback((value: string) => {
    setValue(value);
  }, []);

  return <SimpleMDE value={value} onChange={onChange} />;

}

export default CommentField