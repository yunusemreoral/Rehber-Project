import { useEffect, useState } from "react";
import api from "./api";

// icons
import { RiSearchLine } from "react-icons/ri";
import { IoIosMenu } from "react-icons/io";
import { HiMiniSquares2X2 } from "react-icons/hi2";
import { IoPersonAddSharp } from "react-icons/io5";
// components
import Card from "./components/card";
import Modal from "./components/Modal";

function App() {
  // state kurulumu
  const [contacts, setContacts] = useState([]);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);

  // sayfa yüklendiğinde verileri al
useEffect(() => {
api.get("/contact").then((res) => setContacts(res.data));
}, []);

// form gönderildiğinde çalışacak fonksiyon
const handleSubmit = (e) => {
  // sayfa yenilemesini engelle
  e.preventDefault();

  // ınputaki değere eriş
  const query = e.target[1].value;

  // apıye gönderilecek parametre eriş
  const params = {
    q: query,
  };

  // apı'a istek at ve gelen veriye state'e aktar
  api.get("/contact", {params}).then((res) => setContacts(res.data));
};

// sil ikonuna tıklanınca çalışacak fonskiyon

const handleDelete = (id) => {
// kullanıcıdan onay al
const res = confirm("Kişiyi silmek istediğinizden eminmisiniz ?");

// eger kullanıcı onay verdi ise sil

if(res) {
  // api a istek at ve silme işlemini başlat
  api.delete(`/contact/${id}`).then(() => {
    // silinen kişiyi contacts stateden kaldır
    const updateContacts = contacts.filter((contact) => contact.id != id);

    // güncellenmiş diziyi state e aktar
    setContacts(updateContacts);
  });
}
};

// güncelle ikonuna tıklanınca çalışacak fonksiyon
const handleEdit = (contact) => {
  // modalı aç
  setIsModelOpen(true);

  // guncelleencek kişinin verilerini stateye aktar
  setEditItem(contact);
};

  return (
    <div className="app">
      {/* header */}
      <header>
        {/* logo */}
        <h1>Rehber</h1>

       <div>
         {/* form */}
         <form onSubmit={handleSubmit}>
          <button><RiSearchLine /></button>
          <input type="search" placeholder="Kişi arayınız ..." />
        </form>
       
        <button className="ns"><IoIosMenu /></button>
        <button className="ns"><HiMiniSquares2X2 /></button>
        <button onClick={() => setIsModelOpen(true)} className="add"><IoPersonAddSharp /><span>Yeni Kişi</span></button>
        </div>
      </header>

      {/* main */}

      <main>
        {contacts.map((contact) => (
         <Card 
         contact={contact} 
         handleDelete= {handleDelete} 
         handleEdit={handleEdit}
         key={contact.id} />
        ))}
      </main>

      {/* modal */}
      <Modal 
      editItem={editItem}
      setEditItem={setEditItem}
      setContacts= {setContacts}
      isModelOpen={isModelOpen} 
      setIsModelOpen={setIsModelOpen}
       />
    </div>
  )
}
 export default App;
