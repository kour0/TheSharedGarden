import { useParams } from "react-router-dom";
import { getGarden } from "../../lib/gardens";

export default function Garden() {
  const { gardenId } = useParams();
  const { data, isLoading, isError } = getGarden(gardenId);
  console.log(data);
  return !isLoading ? (
    <div>Gestion du jardin {gardenId} aka {data.name}</div>
  ) : <></>
}