import classes from "./css/loading.module.css";

export default function Loading() {
  return (
    <div className={classes.wrapper}>
      <div className={`${classes.circle} dark:bg-rose-400 bg-rose-500`}></div>
      <div className={`${classes.circle} dark:bg-rose-400 bg-rose-500`}></div>
      <div className={`${classes.circle} dark:bg-rose-400 bg-rose-500`}></div>
      <div className={classes.shadow}></div>
      <div className={classes.shadow}></div>
      <div className={classes.shadow}></div>
    </div>
  );
}
