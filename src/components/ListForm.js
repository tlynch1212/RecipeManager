import React from 'react'
import {
  CButton, CCol, CInput, CLabel, CRow, CListGroupItem, CListGroup
} from '@coreui/react'
import uuid from 'uuid';


const ListForm = (props) => {
  const [CurrentListItem, setCurrentListItem] = React.useState('');
  const [ListItemsKeys, setListItemsKeys] = React.useState([]);

  function getList(){
    return props.getListItems();
  }

  function setList(list){
    return props.setListItems(list);
  }

  function addListItem() {
    let newListItemList = [...getList()];
    newListItemList.push({Value: CurrentListItem});
    setList(newListItemList);
    addListItemKey();
    setCurrentListItem('');
  }

  function addListItemKey() {
    let key = uuid.v4();
    let newListItemKeyList = [...ListItemsKeys];
    newListItemKeyList.push(key);
    setListItemsKeys(newListItemKeyList);
  }

  function addCurrentListItem(event) {
    setCurrentListItem(event.target.value);
  }

  function deleteListItem(key) {
    let newListItemList = [...getList()];
    var indexKey = ListItemsKeys.indexOf(key);
    newListItemList.splice(indexKey, 1);
    setList(newListItemList);
    deleteListItemKey(key);
  };

  function deleteListItemKey(key) {
    let newListItemList = [...ListItemsKeys];
    var indexKey = newListItemList.indexOf(key);
    newListItemList.splice(indexKey, 1);
    setListItemsKeys(newListItemList);
  };

  return (
    <CRow>
      <CCol md='12'>
        <CRow style={{paddingBottom: "10px", paddingTop: "10px"}}>
            <CCol md="3">
                <CLabel>{props.ListAddName}</CLabel>
            </CCol>
            <CCol md="9">
                <CRow row>
                    <CCol md="6">
                        <CInput id="AddListItem" name="AddListItem" onChange={addCurrentListItem} value={CurrentListItem} 
                            placeholder={props.placeHolder} />
                    </CCol>
                    <CCol xs="12" md="2">
                        <CButton type="button" size="sm" onClick={addListItem}
                        disabled={CurrentListItem === "" ? true : false} color="success">Add</CButton>
                    </CCol>
                </CRow>
            </CCol>
        </CRow>

        <CRow>
            <CCol md="3">
                <CLabel>{props.ListName}</CLabel>
            </CCol>
            <CCol md="6" >
                <CListGroup key={getList().length + "list"}>
                    {getList().map((item, index) => (
                        <CListGroupItem className="justify-content-between">
                            {item.Value === undefined ? item.value : item.Value}
                        <CButton type="button" className="float-right" size="sm" 
                            onClick={() => deleteListItem(ListItemsKeys[index])}>Delete</CButton>
                        </CListGroupItem>
                    ))}
                </CListGroup>
            </CCol>
        </CRow>
      </CCol>
    </CRow>
  );
}

export default ListForm;
