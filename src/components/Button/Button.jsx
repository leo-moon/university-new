import classes from './button.module.css';

export default function Button({ children, isActive, ...props }) {
  //   console.log('isActive:', isActive);
  const buttonClasses = isActive
    ? `${classes.button} ${classes.active}`
    : classes.button;
  //   const buttonClasses = `${classes.button} ${isActive ? `${classes.active}` : ''}`;

  return (
    // <button
    //   className={`classes.button ${isActive ? ' classes.active' : ''}`}
    //   onClick={onClick}
    // >
    <button {...props} className={buttonClasses}>
      {children}
    </button>
  );
}
