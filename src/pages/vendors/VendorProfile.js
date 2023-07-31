import {Layout} from '../layout/Layout'
import {Col, Row, Tabs} from "antd";
import React, {useState} from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {useSelector, connect} from "react-redux";
import {countries} from "countries-list";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import {useNavigate} from "react-router-dom";
import './vendors.css'

export const VendorProfile = () => {
    const token = JSON.parse(localStorage.getItem('token')).access_token
    const tenant = useSelector((state) => state.user).user.tenant_id
    const vendor = useSelector((state) => state.vendor).vendor
    const id = vendor.id
    const navigate = useNavigate()
    console.log(id, 'ID')

    // const [formData, setFormData] = useState({
    //     tax_id: '',
    //     company_name: '',
    //     email: '',
    //     first_name: '',
    //     phone_1: '',
    //     fax: '',
    //     industry: '',
    //     customer_type: '',
    //     payment_terms: '',
    //     late_interest: '',
    //     cc_number: '',
    //     cc_expiration: '',
    //     cc_security_code: '',
    //     cc_id: '',
    //     bank_country: '',
    //     bank_name: '',
    //     bank_code: '',
    //     bic_swift: '',
    //     bank_account_name: '',
    //     bank_account_no: '',
    //     bank_branch: '',
    //     bank_signature_date: '',
    //     remarks: '',
    //     address_1: '',
    //     address_2: '',
    //     city: '',
    //     state: '',
    //     country: '',
    //     postal_code: '',
    //     contact_name: '',
    //     contact_phone: '',
    // });

    // const handleChange = (event) => {
    //     const { name, value } = event.target;
    //     setFormData((prevCustomer) => ({
    //         ...prevCustomer,
    //         [name]: value,
    //     }));
    // };

    const handleSubmit = async (values, { setSubmitting }) => {
        setSubmitting(false)
        console.log('form data', values)
        try {
            values.id = id;
            values.tenant_id = tenant;
            const res = await axios.put("/api/vendor/update-vendor", values,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,

                    }
                });

            if (res.status === 200) {
                // Form data submitted successfully, handle success case here
                toast.success(res.data.message);
                console.log('Form submitted successfully!');
                navigate('/vendors')
            } else {
                toast.error(res.data.message)
                console.error('Form submission failed.');
            }
        } catch (error) {
            // Handle any other errors that occurred during the submission process
            console.error('An error occurred:', error);
        }
    };

    const usStates = [
        { label: 'Not Applicable', value: 'NONE' },
        { label: 'Alabama', value: 'AL' },
        { label: 'Alaska', value: 'AK' },
        { label: 'Arizona', value: 'AZ' },
        { label: 'Arkansas', value: 'AR' },
        { label: 'California', value: 'CA' },
        { label: 'Colorado', value: 'CO' },
        { label: 'Connecticut', value: 'CT' },
        { label: 'Delaware', value: 'DE' },
        { label: 'Florida', value: 'FL' },
        { label: 'Georgia', value: 'GA' },
        { label: 'Hawaii', value: 'HI' },
        { label: 'Idaho', value: 'ID' },
        { label: 'Illinois', value: 'IL' },
        { label: 'Indiana', value: 'IN' },
        { label: 'Iowa', value: 'IA' },
        { label: 'Kansas', value: 'KS' },
        { label: 'Kentucky', value: 'KY' },
        { label: 'Louisiana', value: 'LA' },
        { label: 'Maine', value: 'ME' },
        { label: 'Maryland', value: 'MD' },
        { label: 'Massachusetts', value: 'MA' },
        { label: 'Michigan', value: 'MI' },
        { label: 'Minnesota', value: 'MN' },
        { label: 'Mississippi', value: 'MS' },
        { label: 'Missouri', value: 'MO' },
        { label: 'Montana', value: 'MT' },
        { label: 'Nebraska', value: 'NE' },
        { label: 'Nevada', value: 'NV' },
        { label: 'New Hampshire', value: 'NH' },
        { label: 'New Jersey', value: 'NJ' },
        { label: 'New Mexico', value: 'NM' },
        { label: 'New York', value: 'NY' },
        { label: 'North Carolina', value: 'NC' },
        { label: 'North Dakota', value: 'ND' },
        { label: 'Ohio', value: 'OH' },
        { label: 'Oklahoma', value: 'OK' },
        { label: 'Oregon', value: 'OR' },
        { label: 'Pennsylvania', value: 'PA' },
        { label: 'Rhode Island', value: 'RI' },
        { label: 'South Carolina', value: 'SC' },
        { label: 'South Dakota', value: 'SD' },
        { label: 'Tennessee', value: 'TN' },
        { label: 'Texas', value: 'TX' },
        { label: 'Utah', value: 'UT' },
        { label: 'Vermont', value: 'VT' },
        { label: 'Virginia', value: 'VA' },
        { label: 'Washington', value: 'WA' },
        { label: 'West Virginia', value: 'WV' },
        { label: 'Wisconsin', value: 'WI' },
        { label: 'Wyoming', value: 'WY' }
    ];
    const countryOptions = Object.keys(countries).map(countryCode => {
        const countryName = countries[countryCode].name;
        return { label: countryName, value: countryCode };
    });
   const title = vendor.company_name == '' ? vendor.first_name + ' ' + vendor.last_name : vendor.company_name

    return (
        <div>
            <Layout />
            <div className='layout'>
                <h1 className='layout-title font-bold'>{title}</h1>
                <div className='account-details'>
                    {vendor.status == 'inactive' && <div className='mr-3 text-red-600 mb-2 font-bold'>Vendor is inactive</div>}
                    <div >Account Balance: ${vendor.id}</div>
                    <div className='ml-3'>Open Purchase Orders: 0</div>
                </div>
                <div className='mt-6 font-bold'>Vendor No. {vendor.id}</div>
                <Formik
                    initialValues={vendor}
                    onSubmit={handleSubmit}
                >
                    <Form layout="vertical">
                        <Tabs>
                            <Tabs.TabPane tab="Vendor Information" key={0}>
                                <div>
                                    {/*<h1 className="card-title mt-3">Company Details</h1>*/}
                                    <Row gutter={20}>
                                        <Col span={8} xs={240} s={24} lg={8}>
                                            <div>
                                                <label htmlFor="name" className='block text-sm font-medium leading-6 text-gray-900'>Vat/Tax ID</label>
                                                <Field type="text" placeholder='Tax/Vat ID' name="tax_id" className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'/>
                                                <ErrorMessage name="name" component="div" />
                                            </div>
                                        </Col>
                                        <Col span={8} xs={240} s={24} lg={8}>
                                            <div>
                                                <label htmlFor="name" className='block text-sm font-medium leading-6 text-gray-900'>Company Name</label>
                                                <Field type="text" placeholder='Company Name' name="company_name" className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'/>
                                                <ErrorMessage name="name" component="div" />
                                            </div>
                                        </Col>
                                        <Col span={8} xs={240} s={24} lg={8}>
                                            <div>
                                                <label htmlFor="name" className='block text-sm font-medium leading-6 text-gray-900'>Phone Number</label>
                                                <Field type="text" placeholder='Phone Number' name="phone_1" className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'/>
                                                <ErrorMessage name="name" component="div" />
                                            </div>
                                        </Col>
                                    </Row>

                                    <Row gutter={20}>
                                        <Col span={8} xs={240} s={24} lg={8}>
                                            <div>
                                                <label htmlFor="name" className='block text-sm font-medium leading-6 text-gray-900'>Address 1</label>
                                                <Field type="text" placeholder='Address 1'  name="address_1" className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'/>
                                                <ErrorMessage name="name" component="div" />
                                            </div>
                                        </Col>
                                        <Col span={8} xs={240} s={24} lg={8}>
                                            <div>
                                                <label htmlFor="name" className='block text-sm font-medium leading-6 text-gray-900'>Address 2</label>
                                                <Field type="text" placeholder='e.g. Floor No., Suite No.' name="address_2" className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'/>
                                                <ErrorMessage name="name" component="div" />
                                            </div>
                                        </Col>
                                        <Col span={8} xs={240} s={24} lg={8}>
                                            <div>
                                                <label htmlFor="name" className='block text-sm font-medium leading-6 text-gray-900'>City</label>
                                                <Field type="text" placeholder='City' name="city" className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'/>
                                                <ErrorMessage name="name" component="div" />
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row gutter={20}>
                                        <Col span={8} xs={240} s={24} lg={8}>
                                            <div>
                                                <label htmlFor="state" className="block text-sm font-medium leading-6 text-gray-900">
                                                    State
                                                </label>
                                                <Field
                                                    as="select"
                                                    id="state"
                                                    name="state"
                                                    className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                >
                                                    {usStates.map((state) => (
                                                        <option key={state.value} value={state.value}>
                                                            {state.label}
                                                        </option>
                                                    ))}
                                                </Field>
                                                <ErrorMessage name="state" component="div" className="text-red-600" />
                                            </div>
                                        </Col>
                                        <Col span={8} xs={240} s={24} lg={8}>
                                            <div>
                                                <label htmlFor="name" className='block text-sm font-medium leading-6 text-gray-900'>Zip/Postal Code</label>
                                                <Field type="text" placeholder='Zip/Postal Code' name="postal_code" className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'/>
                                                <ErrorMessage name="name" component="div" />
                                            </div>
                                        </Col>
                                        <Col span={8} xs={240} s={24} lg={8}>
                                            <div>
                                                <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                                                    Country
                                                </label>
                                                <Field
                                                    as="select"
                                                    id="country"
                                                    name="country"
                                                    className=" block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                >
                                                    {countryOptions.map((country) => (
                                                        <option key={country.value} value={country.value}>
                                                            {country.label}
                                                        </option>
                                                    ))}
                                                </Field>
                                                <ErrorMessage name="country" component="div" className="text-red-600" />
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row gutter={20}>
                                        <Col span={8} xs={240} s={24} lg={8}>
                                            <div>
                                                <label htmlFor="vendor_type" className="block text-sm font-medium leading-6 text-gray-900">
                                                    Sector
                                                </label>
                                                <Field
                                                    as="select"
                                                    id="vendor_type"
                                                    name="vendor_type"
                                                    className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                >
                                                    <option value="">--Please Select an Option--</option>
                                                    <option value="commercial">Commercial</option>
                                                    <option value="government">Government</option>
                                                    <option value="education">Education</option>
                                                    <option value="individual">Individual</option>
                                                </Field>
                                            </div>
                                            <ErrorMessage name="vendor_type" component="div" className="text-red-600" />
                                        </Col>
                                        <Col span={8} xs={240} s={24} lg={8}>

                                            <div>
                                                <label>
                                                    <Field type="radio" name="status" value="active" />
                                                    Active
                                                </label>
                                            </div>
                                            <div>
                                                <label>
                                                    <Field type="radio" name="status" value="inactive" />
                                                    Inactive
                                                </label>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </Tabs.TabPane>
                            <Tabs.TabPane tab='Contact Information' key={1}>
                                {/*<h1 className="card-title mt-3">Company Details</h1>*/}

                                <Row gutter={20}>
                                    <Col span={8} xs={240} s={24} lg={8}>
                                        <div>
                                            <label htmlFor="name" className='block text-sm font-medium leading-6 text-gray-900'>Contact Name</label>
                                            <Field type="text" placeholder='e.g. CEO, Account Manager' name="contact_name" className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'/>
                                            <ErrorMessage name="name" component="div" />
                                        </div>
                                    </Col>
                                    <Col span={8} xs={240} s={24} lg={8}>
                                        <div>
                                            <label htmlFor="name" className='block text-sm font-medium leading-6 text-gray-900'>First Name</label>
                                            <Field type="text" placeholder='First Name' name="first_name" className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'/>
                                            <ErrorMessage name="name" component="div" />
                                        </div>
                                    </Col>
                                    <Col span={8} xs={240} s={24} lg={8}>
                                        <div>
                                            <label htmlFor="name" className='block text-sm font-medium leading-6 text-gray-900'>Last Name</label>
                                            <Field type="text" placeholder='Last Name' name="last_name" className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'/>
                                            <ErrorMessage name="name" component="div" />
                                        </div>
                                    </Col>
                                </Row>
                                <Row gutter={20}>
                                    <Col span={8} xs={240} s={24} lg={8}>
                                        <div>
                                            <label htmlFor="name" className='block text-sm font-medium leading-6 text-gray-900'>Phone Number</label>
                                            <Field type="text"  placeholder='Phone Number' name="contact_phone" className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'/>
                                            <ErrorMessage name="name" component="div" />
                                        </div>
                                    </Col>
                                    <Col span={8} xs={240} s={24} lg={8}>
                                        <div>
                                            <label htmlFor="name" className='block text-sm font-medium leading-6 text-gray-900'>Email Address</label>
                                            <Field type="text"  name="email" placeholder='Email Address' className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'/>
                                            <ErrorMessage name="name" component="div" />
                                        </div>
                                    </Col>
                                </Row>

                            </Tabs.TabPane>
                            <Tabs.TabPane tab='Purchasing History' key={2}></Tabs.TabPane>
                            <Tabs.TabPane tab='Inventory' key={3}></Tabs.TabPane>
                            <Tabs.TabPane tab='Contracts' key={4}></Tabs.TabPane>
                            <Tabs.TabPane tab='Attachments' key={5}>
                                <Row gutter={20}>

                                    <div className="flex flex-col">
                                        <label htmlFor="remarks" className="mb-2">
                                            Remarks
                                        </label>
                                        <Field
                                            as="textarea"
                                            id="remarks"
                                            name="remarks"
                                            rows="14"
                                            cols="100"
                                            className="border border-gray-400 px-3 py-2 rounded focus:outline-none focus:border-blue-500"
                                        ></Field>
                                        <ErrorMessage name="remarks" component="div" className="text-red-600" />
                                    </div>
                                </Row>
                            </Tabs.TabPane>
                            <Tabs.TabPane tab='Remarks' key={6}>
                                <Row gutter={20}>

                                    <div className="flex flex-col">
                                        <label htmlFor="remarks" className="mb-2">
                                            Remarks
                                        </label>
                                        <Field
                                            as="textarea"
                                            id="remarks"
                                            name="remarks"
                                            rows="14"
                                            cols="100"
                                            className="border border-gray-400 px-3 py-2 rounded focus:outline-none focus:border-blue-500"
                                        ></Field>
                                        <ErrorMessage name="remarks" component="div" className="text-red-600" />
                                    </div>
                                </Row>
                            </Tabs.TabPane>

                        </Tabs>
                        <div className="d-flex justify-content-end">
                            <button
                                type="submit"
                                className="mt-6 rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Update & Close
                            </button>
                        </div>
                    </Form>
                </Formik>
            </div>
        </div>
    )
}
