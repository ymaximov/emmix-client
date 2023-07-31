import {Layout} from "../layout/Layout";
import React, {useState} from "react";
import './inventory.css'
import {AddNewInventoryItemModal} from "../../modals/inventory/addNewInventoryItemModal";

export const Inventory = () => {
    const [showAddNewInventoryItemModal, setShowAddNewInventoryItemModal] = useState(false)
    return (
        <>
        <Layout />
            <div className="layout">
                <div className='inv-top mb-4'>
                    <div className='actions'>
                        <i className="ri-user-add-line" onClick={() => setShowAddNewInventoryItemModal(true)}></i>
                        <i className="ri-search-line ml-1" onClick={() => {}}></i>
                    </div>
                    {showAddNewInventoryItemModal && <AddNewInventoryItemModal setShowAddNewInventoryItemModal={setShowAddNewInventoryItemModal}/>}
                </div>
            </div>
        </>
    )
}
