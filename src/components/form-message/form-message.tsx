import {FC} from 'react';
import styles from './form-message.module.css';
import { Link } from 'react-router-dom';

interface ILink {
  path: string;
  state?: Object | undefined;
}

interface IFormMessageProps {
  message: string;
  linkText: string;
  link: string | ILink;
  replace?: boolean;
}

const FormMessage: FC<IFormMessageProps> = ({ message, linkText, link, replace }) => {

  return (
    <div className="mb-4">
      <span className={`${styles.text} text text_type_main-default mr-2`}>{message}</span>
      <Link to={link} replace={replace} className={`${styles.link} text text_type_main-default`}>
        {linkText}
      </Link>
    </div>
  )
}

export default FormMessage;
