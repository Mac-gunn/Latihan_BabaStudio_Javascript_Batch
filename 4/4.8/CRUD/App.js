const ItemCtrl = (function(){
    const Item = function(id, nama, harga){
        this.id     = id;
        this.nama   = nama;
        this.harga  = harga;
    }

    const data = {
        items : [
           // {id:0, nama: 'seo', harga: 120000},
           // {id:1, nama: 'google adword', harga: 200000},
           // {id:2, nama: 'FB', harga: 520000}
        ],
        currentItem : null, 
        totalHarga : 0
        }
        return {
            getItems : function(){
                return data.items;
            },
            addItem :function(nama, harga){
                var id;

                if(data.items.length>0){
                    id= data.items[data.items.length -1].id + 1;
                }else{
                    id = 0;
                }

                harga = parseInt(harga);
                newItem = new Item(id, nama, harga);
                data.items.push(newItem);

                return newItem;
            }, 
            getItemById: function(id){
                //untuk buat id
                let found = null;

                data.items.forEach(function(item){
                    if(item.id === id)
                    { found = item; }
                });
                return found;
            },

            updateItem: function(nama, harga){
                harga = parseInt(harga);

                let found = null;
                data.items.forEach(function(item){
                    if(item.id === data.currentItem.id){
                        item.nama = nama;
                        item.harga = harga;
                        found = item;
                    }
                });
                return found;
            },

            deleteItem: function(id){
                const ids = data.items.map(function(item){
                    return item.id;
                });

                const index = ids.indexOf(id);
                data.items.splice(index, 1);
            },

            clearAllItem: function(){
                data.items =[];

            },

            setCurrentItem: function(item){
                data.currentItem = item;
            },
            getCurrentItem: function(){
                return data.currentItem;
            },

            getTotalHarga: function(){
                let total = 0;

                //looping item dan tambah class
                data.items.forEach(function(item){
                    total += item.harga;
                });

                //set total to data
                data.totalHarga = total;

                //return total
                return data.totalHarga;
            },

            logData : function(){
                return data;
            }
        
    }
})();

const UIctrl = (function(){
    const UIselector = {
        ItemList        : '#item-list',
        addBtn          : '.add-btn',
        updateBtn       : '.update-btn',
        deleteBtn       : '.delete-btn',
        backBtn         : '.back-btn',
        itemNamaPaket   : '#nama-paket',
        itemHargaPaket  : '#harga-paket',
        totalHarga      : ".total-harga",
        listItems       : '#item-list li',
        clearBtn        : '.clear-btn'

        }
    return{
        populateItemList : function(items){
            let html = '';

            items.forEach(function(item){
                html += 
                `   <li class="collection-item" id="item-${item.id}">
                    <strong>${item.nama}</strong><em>${item.harga}</em>
                    <a href="#" class="secondary-content">
                        <i class="edit-item fa fa-pencil"></i>
                    </a>
                    </li>
                `;
            });
        
            document.querySelector(UIselector.ItemList).innerHTML = html;
        },
        getItemInput : function(){
            return{
                nama : document.querySelector(UIselector.itemNamaPaket).value,
                harga : document.querySelector(UIselector.itemHargaPaket).value
            
            }

        },

        addListItem: function(item){
            document.querySelector(UIselector.ItemList).style.display = 'block';

            const li = document.createElement('li');
            li.className = 'collection-item';
            li.id = `item-${item.id}`;
            li.innerHTML=`
            <strong>${item.nama}</strong><em>${item.harga}</em>
            <a href="#" class="secondary-content">
                <i class="edit-item fa fa-pencil"></i>
            </a>`;

            document.querySelector(UIselector.ItemList).insertAdjacentElement('beforeend', li);
        },

        showTotalHarga: function(totalHarga){

            document.querySelector(UIselector.totalHarga).textContent = totalHarga;

        },

        clearInput: function(){
            document.querySelector(UIselector.itemNamaPaket).value ='';
            document.querySelector(UIselector.itemHargaPaket).value = '';
        },

        updateListItem: function(item){
            let listItems = document.querySelectorAll(UIselector.listItems);

            listItems = Array.from(listItems);
            listItems.forEach(function(listItem){
                const itemID = listItem.getAttribute('id');

                if(itemID === `item-${item.id}`){
                    document.querySelector(`#${itemID}`).innerHTML = `
                    <li class="collection-item" id="item-${item.id}">
                    <strong>${item.nama}</strong><em>${item.harga}</em>
                    <a href="#" class="secondary-content">
                        <i class="edit-item fa fa-pencil"></i>
                    </a>
                    </li>`;
                }
            });
        },

        deleteListitem: function(id){
            const itemID = `#item-${id}`;
            const item = document.querySelector(itemID);
            item.remove();
        },

        addItemToForm : function(){
            document.querySelector(UIselector.itemNamaPaket).value = ItemCtrl.getCurrentItem().nama;
            document.querySelector(UIselector.itemHargaPaket).value = ItemCtrl.getCurrentItem().harga;
            
            UIctrl.showEditState();
        },

        removeItems: function(){
            let listItems = document.querySelector(UIselector.listItems);
            listItems = Array.from(listItems);

            listItems.forEach(function(item){
                item.remove();
            });

             document.querySelector(UIselector.ItemList).innerHTML = "";
        },

        hideList: function(){
            document.querySelector(UIselector.ItemList).style.display = 'none';
        },

        clearEditState: function(){
            UIctrl.clearInput();
            document.querySelector(UIselector.updateBtn).style.display = 'none';
            document.querySelector(UIselector.deleteBtn).style.display = 'none';
            document.querySelector(UIselector.backBtn).style.display = 'none';
            document.querySelector(UIselector.addBtn).style.display = 'inline';

        },

        showEditState: function(){
            document.querySelector(UIselector.updateBtn).style.display = 'inline';
            document.querySelector(UIselector.deleteBtn).style.display = 'inline';
            document.querySelector(UIselector.backBtn).style.display = 'inline';
            document.querySelector(UIselector.addBtn).style.display = 'none';
        },



        getSelectors : function(){
            return UIselector; 
        }
    }
})();

const App = (function(ItemCtrl, UIctrl){

    const loadEventListeners = function(){
        const UIselector = UIctrl.getSelectors();
        document.querySelector(UIselector.addBtn).addEventListener('click', itemAddSubmit);
        document.addEventListener('keypress', function(e){
            if(e.keyCode == 13 || e.which ==13){
                e.preventDefault();
                return false;
            }
        });
        document.querySelector(UIselector.clearBtn).addEventListener('click', clearAllItemClick);
        document.querySelector(UIselector.backBtn).addEventListener('click', backButton);
        document.querySelector(UIselector.updateBtn).addEventListener('click', itemUpdateSubmit);
        document.querySelector(UIselector.ItemList).addEventListener('click', itemEditClick);
        document.querySelector(UIselector.deleteBtn).addEventListener('click', itemDeleteSubmit);
    }

    const itemAddSubmit = function(e){

        const input = UIctrl.getItemInput();

        if(input.nama !=='' && input.harga !== ''){
            const newItem = ItemCtrl.addItem(input.nama, input.harga);

            UIctrl.addListItem(newItem);

            const totalHarga = ItemCtrl.getTotalHarga();

            //add total harga to UI
            UIctrl.showTotalHarga(totalHarga);
            

            UIctrl.clearInput();
        }
        e.preventDefault();
    }

    const itemEditClick = function(e){
        if(e.target.classList.contains('edit-item')){
    
          //mengambil list item id
          const listId = e.target.parentNode.parentNode.id;
          //masuk kedalam sebuah array
          const lisstIdArr = listId.split('-');
          //AMBIL ID YANG SEBENARNYA
          const id = parseInt(lisstIdArr[1]);
          //ambil item
          const itemToEdit = ItemCtrl.getItemById(id);
    
          ItemCtrl.setCurrentItem(itemToEdit);
    
          UIctrl.addItemToForm()
        }
        e.preventDefault();
      }
    
    const itemUpdateSubmit = function(e){
        //untuk mengambil nilai inputan
        const input = UIctrl.getItemInput();
        const updatedItem = ItemCtrl.updateItem(input.nama, input.harga);


        UIctrl.updateListItem(updatedItem);

        const total = ItemCtrl.getTotalHarga();

        UIctrl.showTotalHarga(total);  
   
        UIctrl.clearEditState();


        e.preventDefault();
    }

    const itemDeleteSubmit = function(e){

        const currentItem = ItemCtrl.getCurrentItem();

        //menghapus data berdasarkan id
        ItemCtrl.deleteItem(currentItem.id);

        UIctrl.deleteListitem(currentItem.id);

        const total = ItemCtrl.getTotalHarga();

        UIctrl.showTotalHarga(total);  
   
        UIctrl.clearEditState();

        e.preventDefault();


    }


    const clearAllItemClick = function(e){

        ItemCtrl.clearAllItem();

        const total = ItemCtrl.getTotalHarga();

        UIctrl.showTotalHarga(total);  
        UIctrl.removeItems();
    }

    const backButton = function(e){
        UIctrl.clearEditState();
        e.preventDefault();
    }

    
    return{
        init: function(){
            UIctrl.clearEditState();

            const items = ItemCtrl.getItems();
            if(items.length === 0){
                UIctrl.hideList();
            }else{
                UIctrl.populateItemList(items);
            }

            

            loadEventListeners();


        }
    }
})(ItemCtrl, UIctrl);

App.init();