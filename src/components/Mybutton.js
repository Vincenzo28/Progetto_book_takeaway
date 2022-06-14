const Mybutton = ({style, title, handleClick}) => {
  const btnStyle = {
      backgroundColor: 'white',
      border: '2px solid black',
      width: '80px',
      height: '30px',
      cursor:'pointer',
      ...style,
  };
  return <button onClick={handleClick} style={btnStyle}>{title}</button>;
};

export default Mybutton;
