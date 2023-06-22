import {
  ConnectWallet,
  useAddress,
  useContract,
  useOwnedNFTs,
  useDisconnect,
} from "@thirdweb-dev/react";
import type { NextPage } from "next";
import { CHARACTER } from "../const/contractAddress";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
import { MintCharacter } from "../components/MintCharacter";
const Home: NextPage = () => {
  const address = useAddress();
  const router = useRouter();
  const disconnect = useDisconnect();
  const { contract: editionDrop } = useContract(CHARACTER, "edition-drop");
  const {
    data: ownedNfts,
    isLoading,
    error,
  } = useOwnedNFTs(editionDrop, address);
  // console.log(ownedNfts);
  // const disconnectWallet = () => {
  //   disconnect();
  // };
  if (!address) {
    return (
      <div className={styles.container}>
        <ConnectWallet />
      </div>
    );
  }

  if (isLoading) {
    return <div className={styles.container}>Loading.....</div>;
  }

  if (!ownedNfts || error) {
    return <div>Something went wrong</div>;
  }

  if (ownedNfts.length === 0) {
    return (
      <div className={styles.container}>
        <MintCharacter />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <button
        className={`${styles.mainButton} ${styles.spacerBottom}`}
        onClick={() => router.push("/playGame")}
      >
        Start Game
      </button>
    </div>
  );
};

export default Home;
