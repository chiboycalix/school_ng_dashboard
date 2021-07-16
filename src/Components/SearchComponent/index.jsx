import PropTypes from "prop-types";
import { Input, Select } from 'antd'
import { Option } from 'antd/lib/mentions'
import React from 'react'
import { SearchIcon } from '../../assest/icons'
import './search.scss'

const SearchComponent = ({ options, onChange, placeholder, search, select }) => {
    return (
        <div className="search_section">
            <img src={SearchIcon} alt="Search" />
            {select && <Select
                showSearch
                style={{ width: 200 }}
                placeholder={placeholder}
                showArrow={false}
                onChange={onChange}
                optionFilterProp="children"
                filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                filterSort={(optionA, optionB) =>
                    optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                }
            >
                {options.map(option => <Option value={option}>{option}</Option>)}
            </Select>}

            {search && <Input placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />}
        </div>
    )
}

export const OnSearch = (searchTerm = "", searchBy = [], array = []) =>
    array.filter(value =>
        String(value?.[searchBy[0]])?.toLowerCase()?.trim()?.includes(String(searchTerm)?.toLowerCase()?.trim()) || String(value?.[searchBy[1]])?.toLowerCase()?.trim()?.includes(String(searchTerm)?.toLowerCase()?.trim()))


SearchComponent.propTypes = {
    onChange: PropTypes.func,
    options: PropTypes.shape({
        map: PropTypes.func
    }),
    placeholder: PropTypes.string,
    search: PropTypes.bool,
    select: PropTypes.bool
}
SearchComponent.defaultProps = {
    // onChange: PropTypes.func,
    // options: PropTypes.shape({
    //     map: PropTypes.func
    // }),
    // placeholder: PropTypes.string,
    search: false,
    select: false
}

export default SearchComponent
