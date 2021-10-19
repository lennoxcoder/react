import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, remove, onValue } from "firebase/database";




async function initFireBase() {


  const firebaseConfig = {

   // SUAS CONFIGURAÇOES DO FIREBASE
  };

  return initializeApp(firebaseConfig);


}







async function setFireBaseData(cellNumber, name, address) {

  return new Promise(function (resolve, reject) {

    initFireBase();
    const dataBase = getDatabase();

    set(ref(dataBase, '/' + cellNumber), {
      Name: name,
      Address: address
    })
      .then(() => resolve())
      .catch(err => reject(err));
  })

}






async function getFireBaseData() {

  initFireBase();
  const db = getDatabase();
  const dbref = ref(db);


  return new Promise((resolve, reject) => {

    onValue(dbref, (snapshot) => {

      const fireBaseData = snapshot.val();

      if (fireBaseData && fireBaseData !== "null" && fireBaseData !== "undefined") {

        // Mobile number will be the primary key of the record
        const arrCellNumber = Object.keys(fireBaseData)
        const arrJson = Object.values(fireBaseData);
        var newArrJson = arrJson.map((oJson, i) => {
          return { CellNumber: arrCellNumber[i], ...oJson };
        })
        resolve(newArrJson);

      } else {

        reject('No Firebase data');

      }


    }); // onValue
  }) // Promise

}




async function deleteUser(cellNumber) {

  return new Promise(function (resolve, reject) {

    initFireBase();
    const dataBase = getDatabase();

    if (dataBase && dataBase !== "null" && dataBase !== "undefined") {

      remove(ref(dataBase, '/' + cellNumber))
        .then(() => resolve())
        .catch(err => reject(err));
    } else {
      reject('Erro.')
    }
  })
}




export { setFireBaseData, getFireBaseData, deleteUser }
