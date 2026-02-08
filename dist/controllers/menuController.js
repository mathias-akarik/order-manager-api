"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMenu = void 0;
// Sample in-memory menu
const menu = [
    {
        id: '1',
        name: 'Truffle Wagyu Burger',
        description: 'Double-stacked Wagyu beef, black truffle aioli, aged gruyère, and caramelized onions on a hand-crafted brioche bun.',
        price: 24.99,
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=800',
        category: 'Signature'
    },
    {
        id: '2',
        name: 'Charred Octopus',
        description: 'Spanish octopus, fingerling potatoes, smoked paprika oil, and saffron aioli with fresh herbs.',
        price: 28.50,
        image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&q=80&w=800',
        category: 'Starters'
    },
    {
        id: '3',
        name: 'Heirloom Burrata',
        description: 'Fresh burrata, heirloom tomatoes, aged balsamic, basil oil, and toasted sourdough crumbles.',
        price: 19.00,
        image: 'https://images.unsplash.com/photo-1608897013039-887f3c09080b?auto=format&fit=crop&q=80&w=800',
        category: 'Salads'
    },
    {
        id: '4',
        name: 'Pan-Seared Scallops',
        description: 'Diver scallops, pea purée, crispy prosciutto, and lemon-butter reduction.',
        price: 32.50,
        image: 'https://images.unsplash.com/photo-1532636875304-1c89119d9b4f?auto=format&fit=crop&q=80&w=800',
        category: 'Mains'
    },
    {
        id: '5',
        name: 'Wild Mushroom Risotto',
        description: 'Arborio rice, porcini and shiitake mushrooms, parmesan reggiano, and fresh truffle shavings.',
        price: 26.00,
        image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&q=80&w=800',
        category: 'Mains'
    },
    {
        id: '6',
        name: 'Artisan Tiramisu',
        description: 'Espresso-soaked ladyfingers, mascarpone cream, and 70% dark cocoa dusting.',
        price: 12.99,
        image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&q=80&w=800',
        category: 'Desserts'
    }
];
const getMenu = (req, res) => {
    res.status(200).json(menu);
};
exports.getMenu = getMenu;
