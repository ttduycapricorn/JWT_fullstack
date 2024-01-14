import Dropdown from '@/components/layout/dropdown';

function MenuItems({ items }) {
    return (
        <>
            {items.submenu ? (
                <>
                    <button type="button" aria-haspopup="menu">
                        {items.title}{' '}
                    </button>
                    <Dropdown submenus={items.submenu} />
                </>
            ) : (
                <a href={items.url}>{items.title}</a>
            )}
        </>
    );
}

export default MenuItems;
