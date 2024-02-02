import classNames from 'classnames/bind';
import style from './header.module.scss';
const cx = classNames.bind(style);

function Header() {
    return (
        <>
            <div className={cx('wrapper')}>Header component</div>
        </>
    );
}

export default Header;
