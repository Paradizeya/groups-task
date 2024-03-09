import style from "./style.module.scss";

export default function Avatar({
  color,
  title,
}: {
  color: string;
  title: string;
}) {
  return (
    <div style={{ backgroundColor: color }} className={style.avatar}>
      {title}
    </div>
  );
}
