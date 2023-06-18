import { BackButton } from "../../../components/shared/BackButton";

function PrivateServicesList() {


  return (
    <>
      <section className="headings">
      <BackButton url={'/private/home'} />
        <h1>liste des services</h1>
      </section>
      {/* Vous pouvez continuer ici avec l'affichage des services */}
    </>
  );
}

export default PrivateServicesList;