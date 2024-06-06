import React,{useState,useEffect} from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination } from '@mui/material';
import {Link}  from 'react-router-dom'

export default function PropertyList() {
  const [list,setList]=useState([])
  const[option,setOption]=useState(0)
  useEffect(() => {
    fetch('http://localhost:3003/listings')
    .then(response => response.json())
    .then(data => setList(data))
    .catch(error => console.error('Error fetching data:', error));
  }, [])

  
  const rowsPerPageOptions = [10, 15, 30];

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

const[search,setSearch]=useState('')
const[commercial,setCommercial]=useState('')
const[sort,setSort]=useState('')

const filteredData = list && list
  .filter(item =>
    (item.address.trim().toLowerCase().includes(search.trim().toLowerCase()) ||
      item.propertyType.trim().toLowerCase().startsWith(search.trim().toLowerCase())) &&
    (commercial === '' || item.isCommercial === (commercial === 'true'))
  )
  .sort((a, b) => {
    if (sort === 'priceLowToHigh') {
      return a.price - b.price;
    } else if (sort === 'priceHighToLow') {
      return b.price - a.price;
    } else {
      // Default sorting behavior
      return 0;
    }
  });

  return (
    <div className='container-fluid list'>
      <div className="container  ">
        <div className="row ">
          <h2 className='text-center mt-4'>Find Properties</h2>
          <div className="text-start p-0">
           <button className='btn me-1 btn-sm ' onClick={()=>setOption(0)} style={option===0 ?{background:'var(--secondary)',color:'white'}:{background:'none',color:'var(--secondary)',border:'1px solid var(--secondary)'}}>Table View</button>
           <button className='btn m-1 btn-sm' onClick={()=>setOption(1)} style={option===1 ?{background:'var(--secondary)',color:'white'}:{background:'none',color:'var(--secondary)',border:'1px solid var(--secondary)'}}>Card View</button>

          </div>
          {option===0 &&
          <div className="col-md-12 text-center pt-2 pb- bg-white">
            <div className="row text-end my-2 filters">
              <div className="col-md-auto col-sm-12 text-end search m-1">
                <input type="search" placeholder='Searh here..' value={search}onChange={(e)=>setSearch(e.target.value)} />
              <i className="fa-solid fa-magnifying-glass search_icon"></i>
              </div>
              <div className="col-md-auto col-sm-12 text-end search m-1">
              <select
          value={commercial}
          onChange={(e) => setCommercial(e.target.value)}
          className="filter-select"
        >
          <option value="">Filter Commercial/Non-Commercial</option>
          <option value="true">Commercial</option>
          <option value="false">Non-Commercial</option>
        </select>
              </div>
              <div className="col-md-auto col-sm-12 text-end search m-1">
              <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="filter-select"
        >
          <option value="">Sort by</option>
          <option value="priceLowToHigh">Low Price</option>
          <option value="priceHighToLow">High Price</option>
        </select>
              </div>
            </div>
         <TableContainer>
        <Table>
          <TableHead className='thead'>
            <TableRow>
            <TableCell className='text-center label'>SN</TableCell>
            <TableCell className='text-center label'>Property Type</TableCell>
            <TableCell className='text-center label'>Area Covered</TableCell>
            <TableCell className='text-center label'>Commercial</TableCell>
            <TableCell className='text-center label'>Address</TableCell>
            <TableCell className='text-center label'>Price</TableCell>
            <TableCell className='text-center label'>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData && filteredData.length>0? filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data,index)=>(
              <TableRow key={index}>
                <TableCell className='text-center td'>{index+1}</TableCell>
                <TableCell className='text-center td'>{data.propertyType}</TableCell>
                <TableCell className='text-center td'>{data.coveredAreaSQFT} SQFT</TableCell>
                <TableCell className={`text-center td ${data.isCommercial?'yes':'no'}`}>{data.isCommercial?'Yes':'No'}</TableCell>
                <TableCell className='text-center td'>{data.address}</TableCell>
                <TableCell className='text-center td price'>{data.price} PKR</TableCell>
                <TableCell className='text-center td'><Link className='btn shadow px-2 py-1' to={`/property_list/details/${data.id}`}>Details</Link></TableCell>
                
              </TableRow>
            )):
            <TableRow>
              <TableCell colSpan={3}></TableCell>
              <TableCell className='text-center td'>Result not found</TableCell>

              <TableCell colSpan={3}></TableCell>

            </TableRow>
            }
          </TableBody>
        </Table>
         </TableContainer>
         <TablePagination
                rowsPerPageOptions={rowsPerPageOptions}
                component='div'
                count={filteredData && filteredData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                style={{
                  color: 'blue',
                  fontSize: '14px',
                  fontWeight: '700',
                  textTransform: 'capitalize',
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
          </div>
          }

          {option===1 &&
          <>
          {list && list.map((data,index)=>(
            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 p-1 all_categories" key={data.id}>
            <div className="card border-0 shadow" >
                <div className="image">
                    <img src={data.imageUrl} className="card-img-top" alt="..." />
                </div>
                <div className="card-body">
                    <h5 className="card-title">{data.title}</h5>
                    <h6><i className="fa-solid fa-money-check"></i> <span>{data.price} PKR</span></h6>
                    <h6><i className="fa-solid fa-location-dot"></i> <span>{data.address}</span></h6>
                    <div direction="right">
                       
                            <Link className='btn view_btn py-2' to={`/property_list/details/${data.id}`}>View Details</Link>
                        
                        </div>

                </div>
            </div>
        </div>
          ))}
          </>
          }

        </div>
      </div>
    </div>
  )
}
