import { BigInt } from "@graphprotocol/graph-ts"
import { Contract, Transfer, Approval } from "../generated/Contract/Contract"
import { Transfer as TransferEntity, Approval as ApprovalEntity } from "../generated/schema"

export function handleTransfer(event: Transfer): void {
  let entity = new TransferEntity(event.transaction.hash.concatI32(event.logIndex.toI32()).toHexString())
  

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleApproval(event: Approval): void {
  let entity = new ApprovalEntity(event.transaction.hash.concatI32(event.logIndex.toI32()).toHexString())
  

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

