import { useKnownMerchants } from '@/hooks/useKnownMerchants';
import { useSubcategories } from '@/hooks/useSubcategories';
import type { KnownMerchant } from '@/model/KnownMerchant';
import {
  Flex
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { KnownMerchantsList } from '../components/known_merchant/KnownMerchantsList';
import { SelectedMerchantPanel } from '../components/known_merchant/SelectedMerchantPanel';

export const KnownMerchantsPage = () => {
  const { merchantId } = useParams();
  const navigate = useNavigate();
  const { data: subcategories } = useSubcategories();
  const { data: merchants, isLoading: merchantsLoading, isFetching: merchantsFetching } = useKnownMerchants();

  const selectedMerchant = merchants?.find(
    m => String(m.merchantId) === merchantId
  );

  const setSelectedMerchant = (merchant?: KnownMerchant) => {
    if (!merchant) {
      navigate("/merchants");
      return;
    }
    navigate(`/merchants/${merchant.merchantId}`);
  };


  return (
    <Flex bg="gray.50" p={5} gap={5} w={'80%'} maxW={'1200px'}>
      <KnownMerchantsList
        isMerchantsLoading={merchantsLoading || merchantsFetching}
        merchants={merchants || []}
        selectedMerchant={selectedMerchant}
        setSelectedMerchant={setSelectedMerchant} />
      <SelectedMerchantPanel
        selectedMerchant={selectedMerchant}
        subcategories={subcategories || []} />
    </Flex>
  )
}
