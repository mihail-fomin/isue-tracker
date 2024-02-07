import Pagination from './components/Pagintaion'

export default function Home() {
  return <Pagination itemCount={100} pageSize={10} currentPage={10}/>
}
