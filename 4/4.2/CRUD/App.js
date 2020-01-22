const ItemCtrl = (function(){
    const Item = function(id, nama, harga){
        this.id     = id;
        this.nama   = nama;
        this.harga  = harga;
    }

    const data = {
        items : [
            {id:0, nama: 'seo', harga: 120000},
            {id:1, nama: 'google adword', harga: 200000},
            {id:2, nama: 'FB', harga: 520000}
        ],
        currentItem : null, 
        totalHarga : 0
        }
        return {
            getItem : function(){
                return data.items;
            },
            logData : function(){
                return data;
            }
        
    }
})();

const UIctrl = (function(){
    const UIselector = {
        ItemList : '#item-list'
        }
    return{
        populateItemList : function(items){
            let html = '';

            items.forEach(function(item){
                html += 
                `   <li class="collection-item" id="item-${item.id}">
                    <strong>${item.nama}</strong><em>${item.harga}</em>
                    <a href="#" class="secondary-content">
                        <i class="fa fa-pencil"></i>
                    </a>
                    </li>
                `;
            });
        
            document.getElementById('item-list').innerHTML = html;
        }
    }
})();

const App = (function(ItemCtrl, UIctrl){
    return{
        init: function(){
            const items = ItemCtrl.getItem();

            UIctrl.populateItemList(items);
        }
    }
})(ItemCtrl, UIctrl);

App.init();