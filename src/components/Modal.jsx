// ıcons
import { IoMdClose } from "react-icons/io";

import api from "../api";

// components
import Field from "./Field";

const Modal = ({
    isModelOpen, 
    setIsModelOpen, 
    setContacts, 
    editItem,
    setEditItem,
}) => {
    //form gönderildiğinde çalışacak fonksiyon
    const handleSubmit = async (e) => {
        // sayfa yenilemesini engelle
        e.preventDefault();

        // JavaScript içerisinde bulunan formData yapısı sayesinde her bir input içeirisindeki verilere teker teker erişmek yerine hepsine tek bir seferde erişebiliriz
        const formData = new FormData(e.target);

         // Object.fromEntries() metodu, bir form'daki tüm inputların key-value çiftlerini bir object'e dönüştürür
        const newContact = Object.fromEntries(formData.entries());

        if(!editItem) {
             // erişilen değerleri apı ye gonder
        const response = await api.post("/contact", newContact);

        // contacts state ını güncelle.önceki veriyi koru ve üzerine eklenen kişiyi ekle
        
        setContacts((contacts) => [...contacts,response.data]);
        }
else {
    // güncelleencek kişiyi apı a gönder
    const response = await api.put(`/contact/${editItem.id}`, newContact);
    // güncellenen kişiyi contacts state i içerisinde de güncelle
    setContacts((contacts) => 
        contacts.map((contact) =>
    contact.id === editItem.id ? response.data : contact
)
);
// edit ıtem statini nulla çek
setEditItem(null);
}
       

        // model penceresini kapat
        setIsModelOpen(false);
   
    };

    return (
     isModelOpen && (
        <div className="modal">
        <div className="modal-inner">
            {/* head */}
        <div className="modal-head">
            {/* Edit Modundaysa Kişiyi Güncelle yoksa Yeni Kişi Ekle Yazsın */}
            <h2> {editItem ? "Kişiyi Güncelle" : "Yeni Kişi Ekle"} </h2>
            <button className="add" onClick={() => {
                setEditItem(null);
                setIsModelOpen(false);
                }} >
            <IoMdClose />
            </button>
        </div>
        {/* form */}
        <form onSubmit={handleSubmit} >
<Field value={editItem?.name} label="İsim Soyisim" name="name" />
<Field value={editItem?.position} label="Pozisyon" name="position" />
<Field value={editItem?.company} label= "Şirket" name="company" />
<Field value={editItem?.phone} label="Telefon" name="phone" />
<Field value={editItem?.email} label="Email" name="email" />
<div className="buttons">
<button onClick={() => {
    setEditItem(null);
    setIsModelOpen(false);
    }} 
    >
        Vazgeç</button>
<button type="submit">Gönder</button>
</div>
        </form>
        </div>
    </div>
     )
    ); 
};

export default Modal;